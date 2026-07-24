module.exports = {
  default: {
    require: ['step_definitions/**/*.js', 'support/**/*.js'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true,
    timeout: 120000
  }
};
