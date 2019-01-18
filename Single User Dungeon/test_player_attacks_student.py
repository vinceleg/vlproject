from unittest import TestCase
from battle import player_attacks_student
from character import Character
from student import Student


class TestPlayerAttacksStudent(TestCase):
    def test_player_attacks_student_return_none(self):
        player = Character('Vincent')
        opponent = Student()
        self.assertIsNone(player_attacks_student(player, opponent))
