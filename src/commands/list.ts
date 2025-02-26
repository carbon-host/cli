import { Carbon } from "@carbonhost/typescript";
import { Command, Flags } from "@oclif/core";
import { printTable } from "@oclif/table";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import ora from "ora";
import prettyBytes from "pretty-bytes";

export default class List extends Command {
  static override aliases = ["ls"];
  static override description = "List all your stars";
  static override examples = [
    "<%= config.bin %> <%= command.id %>",
    "<%= config.bin %> ls",
  ];
  static override flags = {
    format: Flags.string({
      char: "f",
      description: "Output format (table, json)",
      options: ["table", "json"],
      default: "table",
    }),
    columns: Flags.string({
      char: "c",
      description: "Only show provided columns (comma-separated)",
      default: "id,name,type,status,ram,cpu",
    }),
    sort: Flags.string({
      char: "s",
      description: "Property to sort by",
      default: "name",
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(List);

    // Get API key from ~/.carbon
    let key;
    try {
      const carbonFile = fs.readFileSync(
        path.join(os.homedir(), ".carbon"),
        "utf8"
      );
      key = carbonFile.split("=")[1]?.trim();

      if (!key) {
        this.error(
          "Invalid API key found. Please run `carbon login` to authenticate."
        );
        return;
      }
    } catch (error) {
      this.error(
        "No API key found. Please run `carbon login` to authenticate."
      );
      return;
    }

    const spinner = ora("Fetching your stars...").start();

    try {
      const carbonClient = new Carbon({ apiKey: key });
      const stars = await carbonClient.getStars();

      spinner.stop();

      if (!stars || stars.length === 0) {
        this.log(
          "You don't have any stars yet. Create one at https://carbon.host"
        );
        return;
      }

      if (flags.format === "json") {
        this.log(JSON.stringify(stars, null, 2));
        return;
      }

      // Transform stars data for table display
      const tableData = stars.map((star) => ({
        id: star._id,
        name: star.name,
        type: star.config.type,
        status: star.suspended ? "OFF" : "ON",
        ram: `${prettyBytes(star.resources.memory)}`,
        cpu: `${star.resources.vCPU / 100} vCPU`,
        ip: star.subdomain || star.ip || "N/A",
        created: new Date(star.createdAt).toLocaleDateString(),
      }));

      // Define the type for our table data
      type StarTableData = (typeof tableData)[number];

      // Get columns to display from flags and ensure they are valid column names
      const validColumns = [
        "id",
        "name",
        "type",
        "status",
        "ram",
        "cpu",
        "ip",
        "created",
      ] as const;
      type ValidColumn = (typeof validColumns)[number];

      const columnsToDisplay = flags.columns
        .split(",")
        .map((c) => c.trim())
        .filter((col): col is ValidColumn =>
          validColumns.includes(col as ValidColumn)
        );

      // Create sort configuration
      const sortConfig: Record<string, "asc" | "desc"> = {};
      if (validColumns.includes(flags.sort as ValidColumn)) {
        sortConfig[flags.sort] = "asc";
      } else {
        sortConfig["name"] = "asc"; // Default sort
      }

      // Print table using oclif/table
      printTable({
        data: tableData,
        columns: columnsToDisplay,
        sort: sortConfig,
        title: "🌟 Your Stars",
        titleOptions: { bold: true },
        headerOptions: {
          formatter: "capitalCase",
        },
        horizontalAlignment: "center",
      });
    } catch (error) {
      spinner.fail("Failed to fetch stars");
      this.error(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}
