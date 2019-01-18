"""Game map functions."""
from character import Character


def display_player_info(player: Character):  # no doctest because nothing is returned
    """Display the player's name and hp.

    PARAM: player is a class instance
    PRECONDITION: player is a class instance
    POSTCONDITION: N/A
    RETURN: N/A
    """
    print("\n " + player.name.title(),
          "  HP:", player.hp)


def game_map(empty_list: list):  # no doctest because nothing is returned
    """Append a list to a empty list.

    This is used to make a nested list to be used to print out a map in another function. The map will be 5x5 so this
    is appends 5 lists with a period inside to an empty list.

    PARAM: empty_list is an empty list
    PRECONDITION: empty_list is an empty list
    POSTCONDITION: N/A
    RETURN: N/A
    """
    for row in range(5):
        empty_list.append([" . "] * 5)


def print_map(a_map: list, player: Character):  # no doctest because nothing is returned
    """Print a map from a nested list.

    Prints out a grid without a list's '[]'.

    PARAM: a_map is a list
    PRECONDITION: a_map is a list
    POSTCONDITION: N/A
    RETURN: N/A
    """
    display_player_info(player)
    for i in a_map:
        print(" ".join(i) + "\n")


def make_the_map(a_map: list, player: Character):
    """Print a map with the player represented by a 'x' on it.

    This will print the game map where a character will move around.

    PARAM: a_map is a empty list and player is a class instance
    PRECONDITION: a_map is a empty list and player is a class instance
    POSTCONDITION: N/A
    RETURN: N/A
    """
    game_map(a_map)
    a_map[player.x][player.y] = " x "
    print_map(a_map, player)


def update_previous_coordinates(player: Character):
    """Update a player's previous position coordinates with their current position.

    These coordinates will be used each loop to replace the player's previous position on the map with a period.
    This is used to make sure the map is displayed properly when a player moves.

    PARAM: player is a class instance
    PRECONDITION: player is a class instance
    POSTCONDITION: N/A
    RETURN: N/A
    """
    player.previous_x = player.x  # sets player's current position x to previous x
    player.previous_y = player.y  # sets player's current position y to previous y


def update_map(a_map: list, player: Character):
    """Update game map with character's new position and replace old position with a period.

    This is used to make sure the map is displayed properly when a player moves.

    PARAM: a_map is a nested list and player is a class instance
    PRECONDITION: a_map is a nested list and player is a class instance
    POSTCONDITION: N/A
    RETURN: N/A
    """
    a_map[player.previous_x][player.previous_y] = " . "  # changes player's old position to '.'
    a_map[player.x][player.y] = " x "  # changes player's new position to 'x'
    update_previous_coordinates(player)
    print_map(a_map, player)
