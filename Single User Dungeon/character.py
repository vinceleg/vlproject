"""Character class"""
from die import Die


class Character:
    """A class representing a character."""

    def __init__(self, name):
        """Initialize attributes to describe a character."""
        self.name = name
        self.x = 2
        self.y = 2
        self.previous_x = 2
        self.previous_y = 2
        self.hp = 10
        self.player_damage = 0

    def get_name(self) -> str:
        """Return name of character.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: name as a string
        >>> player = Character("Vincent")
        >>> player.get_name()
        'Vincent'
        """
        return self.name

    def get_x_coord(self) -> int:
        """Return character's x coordinate.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: x_coord as an int
        >>> player = Character("Vincent")
        >>> player.get_x_coord()
        2
        """
        return self.x

    def get_y_coord(self) -> int:
        """Return character's y coordinate.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: y_coord as an int
        >>> player = Character("Vincent")
        >>> player.get_y_coord()
        2
        """
        return self.y

    def get_previous_x_coord(self) -> int:
        """Return character's previous x coordinate.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: previous_x_coord as an int
        >>> player = Character("Vincent")
        >>> player.get_previous_x_coord()
        2
        """
        return self.previous_x

    def get_previous_y_coord(self) -> int:
        """Return character's previous y coordinate.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: previous_y_coord as an int
        >>> player = Character("Vincent")
        >>> player.get_previous_y_coord()
        2
        """
        return self.previous_y

    def get_hp(self) -> int:
        """Return character's hp.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: hp as an int
        >>> player = Character("Vincent")
        >>> player.get_hp()
        10
        """
        return self.hp

    def move_north(self):
        """Move character north by 1.

        >>> player = Character("Vincent")
        >>> player.move_north()
        >>> player.get_x_coord()
        1
        """
        self.x -= 1

    def move_south(self):
        """Move character south by 1.

        >>> player = Character("Vincent")
        >>> player.move_south()
        >>> player.get_x_coord()
        3
        """
        self.x += 1

    def move_west(self):
        """Move character west by 1.

        >>> player = Character("Vincent")
        >>> player.move_west()
        >>> player.get_y_coord()
        1
        """
        self.y -= 1

    def move_east(self):
        """Move character east by 1.

        >>> player = Character("Vincent")
        >>> player.move_east()
        >>> player.get_y_coord()
        3
        """
        self.y += 1

    def get_attack_damage(self) -> int:  # gets a random value, did not doctest
        """Return the player's attack damage.

        PRECONDITION: player_damage is found by rolling a 1d6
        POSTCONDITION: N/A
        RETURN: player_damage as an int
        """
        player_attack = Die(6)
        player_attack.roll_die()
        self.player_damage = player_attack.get_value()
        return self.player_damage

    def display_flee_message(self):  # nothing is returned, did not doctest
        """Simulate a character fleeing battle."""
        print(self.name + " ran away!\n")


def main():
    pass


if __name__ == "__main__":
    main()
