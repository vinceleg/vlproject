from unittest import TestCase
from battle import display_player_and_student_health
from character import Character
from student import Student


class TestDisplayPlayerAndStudentHealth(TestCase):
    def test_display_player_and_student_health_return_none(self):
        player = Character('Vincent')
        opponent = Student()
        self.assertIsNone(display_player_and_student_health(player, opponent))

