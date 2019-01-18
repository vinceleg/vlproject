from unittest import TestCase
from battle import student_attacks_player
from character import Character
from student import Student


class TestStudentAttacksPlayer(TestCase):
    def test_student_attacks_player_return_none(self):
        player = Character('Vincent')
        opponent = Student()
        self.assertIsNone(student_attacks_player(player, opponent))