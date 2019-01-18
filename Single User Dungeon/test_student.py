from unittest import TestCase
from student import Student


class TestStudent(TestCase):

    def setUp(self):
        self.test_student = Student()

    def test_get_hp(self):
        self.assertEqual(5, self.test_student.get_hp())

    def test_student_damage(self):
        self.assertEqual(0, self.test_student.student_damage)

    def test_student_flee_damage(self):
        self.assertEqual(0, self.test_student.student_flee_damage)
