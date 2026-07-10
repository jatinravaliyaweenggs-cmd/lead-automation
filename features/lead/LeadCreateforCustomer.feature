@leadCustomer
Feature: Create Lead for Customer
  As a user I want to open the Lead page to create a lead for a customer

  Background:
    Given User is on the login page
    When User login with valid credentials
    Then User should be redirected to the dashboard

  Scenario: Fill company name, first name and last name in Lead form
    When User navigates to Lead page and opens Add Lead form
    When User fills in the lead form details


