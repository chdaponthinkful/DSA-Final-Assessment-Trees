const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // Parent node in the BST context
    this.leftReport = null; // Left child
    this.rightReport = null; // Right child
  }

  assignOfficer(officerId, officerName) {
    if (!this.officerId) {
      this.officerId = officerId;
      this.officerName = officerName;
    } else if (officerId < this.officerId) {
      if (this.leftReport) {
        this.leftReport.assignOfficer(officerId, officerName);
      } else {
        this.leftReport = new StarshipEnterprise(officerId, officerName);
      }
    } else {
      if (this.rightReport) {
        this.rightReport.assignOfficer(officerId, officerName);
      } else {
        this.rightReport = new StarshipEnterprise(officerId, officerName);
      }
    }
  }

  findOfficersWithNoDirectReports(values = []) {
    if (!this.leftReport && !this.rightReport) {
      values.push(this.officerName);
    }
    if (this.leftReport) {
      this.leftReport.findOfficersWithNoDirectReports(values);
    }
    if (this.rightReport) {
      this.rightReport.findOfficersWithNoDirectReports(values);
    }
    return values;
  }

  listOfficersByExperience(officerNames = []) {
    if (this.rightReport) {
      this.rightReport.listOfficersByExperience(officerNames);
    }
    officerNames.push(this.officerName);
    if (this.leftReport) {
      this.leftReport.listOfficersByExperience(officerNames);
    }
    return officerNames;
  }

  listOfficersByRank(tree = this, rankedOfficers = {}, currentRank = 1) {
    if (!tree) return rankedOfficers;

    if (!rankedOfficers[currentRank]) {
      rankedOfficers[currentRank] = [tree.officerName];
    } else {
      rankedOfficers[currentRank].push(tree.officerName);
    }

    if (tree.leftReport) {
      this.listOfficersByRank(tree.leftReport, rankedOfficers, currentRank + 1);
    }
    if (tree.rightReport) {
      this.listOfficersByRank(tree.rightReport, rankedOfficers, currentRank + 1);
    }

    return rankedOfficers;
  }
}

module.exports = StarshipEnterprise;

module.exports = StarshipEnterprise;
