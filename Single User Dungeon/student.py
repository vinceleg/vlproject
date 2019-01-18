"""Student class"""
from die import Die


class Student:
    """A class representing a student."""

    def __init__(self):
        """Initialize attributes to describe a student."""
        self.hp = 5
        self.student_damage = 0
        self.student_flee_damage = 0

    def get_hp(self):
        """Get current value of student's HP.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: hp as an int
        >>> student = Student()
        >>> student.get_hp()
        5
        """
        return self.hp

    def get_student_attack_damage(self):  # returns random value, did not doctest
        """Return a student's attack damage.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: student_damage as an int
        """
        student_attack = Die(6)
        student_attack.roll_die()
        self.student_damage = student_attack.get_value()
        return self.student_damage

    def get_student_flee_attack_damage(self):  # returns random value, did not doctest
        """Return a student's attack damage when attacking a fleeing player.

        PRECONDITION: N/A
        POSTCONDITION: N/A
        RETURN: student_flee_damage as an int
        """
        student_flee_attack = Die(4)
        student_flee_attack.roll_die()
        self.student_flee_damage = student_flee_attack.get_value()
        return self.student_flee_damage
