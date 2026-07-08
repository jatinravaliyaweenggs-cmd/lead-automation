@opportunity
Feature: Opportunity Navigation
  As a user I want to navigate to the Opportunity module

  Background:
    Given User is on the login page
    When User login with valid credentials
    Then User should be redirected to the dashboard

  Scenario: Navigate to Opportunity page from Dashboard
    When User navigates to Opportunity page


