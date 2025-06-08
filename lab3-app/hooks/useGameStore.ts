import { create } from 'zustand';
import { useMemo } from 'react';

const initialTasks = [
  { id: 'click', title: 'Зробити 10 кліків', count: 0, goal: 10 },
  { id: 'double', title: 'Подвійний клік 5 разів', count: 0, goal: 5 },
  { id: 'long', title: 'Утримати об’єкт 3 с', count: 0, goal: 1 },
  { id: 'pan', title: 'Перетягнути об’єкт', count: 0, goal: 1 },
  { id: 'swipe', title: 'Свайп (вліво або вправо)', count: 0, goal: 2 },
  { id: 'pinch', title: 'Змінити розмір об’єкта', count: 0, goal: 1 },
  { id: 'score', title: 'Отримати 100 очок', count: 0, goal: 100 },
];

type Task = {
  id: string;
  title: string;
  count: number;
  goal: number;
};

type GameStore = {
  score: number;
  tasks: Task[];
  increaseScore: (points: number) => void;
  incrementTask: (id: string) => void;
};

export const useGameStore = create<GameStore>((set) => ({
  score: 0,
  tasks: initialTasks,
  increaseScore: (points) =>
    set((state) => ({
      score: state.score + points,
      tasks: state.tasks.map((task) =>
        task.id === 'score'
          ? { ...task, count: Math.min(task.count + points, task.goal) }
          : task
      ),
    })),
  incrementTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, count: Math.min(task.count + 1, task.goal) }
          : task
      ),
    })),
}));

export const useTaskStore = () => {
  const rawTasks = useGameStore((s) => s.tasks);
  const tasks = useMemo(() => {
    return rawTasks.map((task) => ({
      ...task,
      completed: task.count >= task.goal,
    }));
  }, [rawTasks]);

  return { tasks };
};