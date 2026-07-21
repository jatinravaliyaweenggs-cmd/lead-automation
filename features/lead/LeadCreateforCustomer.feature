@leadCustomer
Feature: Create Lead for Customer
  As a user I want to open the Lead page to create a lead for a customer

  Background:
    Given User is on the login page
    When User login with valid credentials
    Then User should be redirected to the dashboard

  # Scenario: Fill company name, first name and last name in Lead form
  #   When User navigates to Lead page and opens Add Lead form
  #   Then Lead form should be opened
  #   When User fills in the lead form details

  # Scenario: Click first row and add details
  #   When User navigates to Lead page and opens Add Lead form
  #   When User clicks the first row in the table
  #   When User enters project name, title, and fax details in one step

  #  Scenario: add Additional Details — steps commented out, skipped for now
  #  When User navigates to Lead page and opens Add Lead form
  #  When User clicks the first row in the table
  #  When User selects the first Contact Time option
  #  When User selects the first Best Time to Call option
  #  When User enters the gate code
  #  When User selects a tag

  # Scenario: add Additional Contact
  #   When User navigates to Lead page and opens Add Lead form
  #   When User clicks the first row in the table
  #   When User clicks the Additional Contact button
  #   When User fills in the additional contact details


  # Scenario: add Additional Address
  #   When User navigates to Lead page and opens Add Lead form
  #   When User clicks the first row in the table
  #   When User clicks the value "Surat"

    
   Scenario: add Additional Address
     When User navigates to Lead page and opens Add Lead form
     When User clicks the first row in the table
     When user open sales tab
     When User selects today date
     When User enters the lead value