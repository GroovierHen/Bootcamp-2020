import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { composeStories } from '@storybook/testing-react';

import * as TaskListStories from './TaskList.stories'; //👈  Our stories imported here

const store = {
    getState: () => {
        return {
            tasks: TaskListStories.Default.args.tasks,
        };
    },
    subscribe: () => 0,
    dispatch: jest.fn(),
};

//👇 composeStories will process all information related to the component (e.g., args)
const { WithPinnedTasks } = composeStories(TaskListStories);

it('renders pinned tasks at the start of the list', () => {
    const { container } = render(<Provider store={store}><WithPinnedTasks /></Provider>);

    expect(
        container.querySelector('.list-item:nth-child(1) input[value="Task 6 (pinned)"]')
    ).not.toBe(null);
});