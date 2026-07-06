@login
Feature: Login
  As a user want to login to CFTeam application

  Scenario: Login with valid credentials
    Given User is on the login page
    When User login with valid credentials
    Then User should be redirected to the dashboard
