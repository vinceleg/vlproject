"""Movement Command functions."""
from character import Character


def get_player_command() -> str:
    """Cue the user to select a direction, format the selection to lower case and return it.

    PRECONDITION: N/A
    POSTCONDITION: N/A
    RETURN: move as a lower-case string
    """
    move = input("Enter 'quit' any time to save and quit.\n"
                 "Move north('n'), south('s'), west('w'), or east('e')? \n")
    move = move.lower()
    return move


def boundary_check(player: Character, move: str) -> bool:
    """Return True if player is at the border of the map and will move out of bounds.

    This will be used before executing a player's movement. If this returns True, player
    will not complete their move.

    PARAM: player is a Class instance and move is a string
    PRECONDITION: player is a Class instance and move is a string
    POSTCONDITION: N/A
    RETURN: True if player is at the border of map and trying to move out of it
    >>> player = Character("Vincent")
    >>> player.x = 0
    >>> move = "n"
    >>> boundary_check(player, move)
    True
    >>> player.x = 4
    >>> move = "s"
    >>> boundary_check(player, move)
    True
    >>> player.y = 0
    >>> move = "w"
    >>> boundary_check(player, move)
    True
    >>> player.y = 4
    >>> move = "e"
    >>> boundary_check(player, move)
    True
    """
    if player.x == 0 and move == "n":
        return True
    if player.x == 4 and move == "s":
        return True
    if player.y == 0 and move == "w":
        return True
    if player.y == 4 and move == "e":
        return True


def movement(player: Character, move: str):
    """Simulate a player's move on a map or return False if command is invalid.

    Will look at a user's input and move the character in a direction. If user input
    is not recognized, it will print a warning message and return False, which will be
    used to ask the user to input another direction.

    PARAM: player is a Class instance and move is a string
    PRECONDITION: player is a Class instance and move is a string
    POSTCONDITION: N/A
    RETURN: a class method or False if input is invalid
    >>> player = Character("Vincent")
    >>> move = "ee"
    >>> movement(player, move)
    Please enter a proper direction!
    <BLANKLINE>
    False
    """
    if move == "n":
        player.move_north()
    elif move == "s":
        player.move_south()
    elif move == "w":
        player.move_west()
    elif move == "e":
        player.move_east()
    else:
        print("Please enter a proper direction!\n")
        return False
