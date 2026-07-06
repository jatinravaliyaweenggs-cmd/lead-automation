@lead
Feature: Lead Navigation
  As a user want to navigate to Lead module

  Background:
    Given User is on the login page
    When User login with valid credentials
    Then User should be redirected to the dashboard

  Scenario: Navigate to Lead page from Dashboard
    When User navigates to Lead page via Dashboard
    Then User should see Leads heading
