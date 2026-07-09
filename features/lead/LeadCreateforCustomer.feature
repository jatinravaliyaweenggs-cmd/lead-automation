@leadCustomer
Feature: Create Lead for Customer
  As a user I want to open the Lead page to create a lead for a customer

  Background:
    Given User is on the login page
    When User login with valid credentials
    Then User should be redirected to the dashboard

  Scenario: Open Lead page and Add Lead form for Customer
    When User navigates to Lead page and opens Add Lead form
    Then Lead form should be opened
