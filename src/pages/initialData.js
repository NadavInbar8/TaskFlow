const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'take out the garbage' },
    'task-2': { id: 'task-2', content: 'watch my favorite' },
    'task-3': { id: 'task-3', content: 'charge my phone' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'todo',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
