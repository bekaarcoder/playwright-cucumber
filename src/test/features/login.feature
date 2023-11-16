Feature: User Authentication Tests

  Background: 
    Given User navigates to the application
    When User click on the login link

  Scenario: Login should be successful
    When User enters the username as "janedoee"
    And User enters the password as "Password@123"
    And User clicks on the login button
    Then User is logged in successfully

  Scenario: Login should not be successful
    When User enters the username as "janedoe"
    And User enters the password as "password"
    And User clicks on the login button
    Then Login should fail
