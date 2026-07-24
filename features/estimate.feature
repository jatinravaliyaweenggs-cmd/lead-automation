Feature: Estimate Creation

  Background:
    Given User is on the login page
    When User login with valid credentials
    Then User should be redirected to the dashboard

  Scenario: Create a new Estimate
    When User navigates to Estimate page
    And User creates a new Estimate
    Then Estimate should be created successfully