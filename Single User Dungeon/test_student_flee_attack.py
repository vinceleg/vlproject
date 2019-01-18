from unittest import TestCase
from battle import student_flee_attack
from character import Character
from student import Student


class TestStudentFleeAttack(TestCase):

    def test_student_flee_attack_return_none(self):
        player = Character('Vincent')
        opponent = Student()
        self.assertIsNone(student_flee_attack(player, opponent))
