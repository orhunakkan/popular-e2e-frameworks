@todoApp
Feature: Todo Application Features

  Background: Launch Todo Application
    Given A user has launched the To-Do Application

  @smoke
  Scenario: Verify Default Todo Items
    Then The To-Do list should have two items
    And The first item should be 'Pay electric bill'
    And The second item should be 'Walk the dog'

  @regression
  Scenario: Add New Todo Item
    When The user adds 'Feed the cat' to the Todo list
    Then The To-Do list should have three items
    And The third item should be 'Feed the cat'

  @smoke
  Scenario: Checkoff a Task as Completed
    When The user checks off the first item as completed
    Then The first To-Do item should be marked as 'completed'

  @smoke
  Scenario: Filter for Uncompleted Tasks
    Given The first task is marked as completed
    When The user filters for 'Active' tasks
    Then Only the uncompleted tasks should be displayed
    And The uncompleted task should be 'Walk the dog'

  @regression
  Scenario: Filter for Completed Tasks
    Given The first task is marked as completed
    When The user filters for 'Completed' tasks
    Then Only the completed tasks should be displayed
    And The completed task should be 'Pay electric bill'

  @regression
  Scenario: Delete all Completed Tasks
    Given The first task is marked as completed
    When The user deletes all 'Completed' tasks
    Then All completed tasks should be removed
    And The To-Do list should have one item

#  @scenarioOutline
#  Scenario Outline: Add Multiple Todo Items
#    When The user adds '<task>' to the Todo list
#    Then The To-Do list should have '<count>' items
#    And The last item should be '<task>'
#
#    Examples:
#      | task             | count |
#      | Buy groceries    | 3     |
#      | Schedule meeting | 4     |
#      | Call plumber     | 5     |
#
#  @scenarioOutline @tags
#  Scenario Outline: Completing and Verifying Task Status
#    Given The '<task>' is added to the list
#    When The user marks the '<task>' as completed
#    Then The '<task>' should be marked as 'completed'
#
#    Examples:
#      | task            |
#      | Buy groceries   |
#      | Walk the dog    |
