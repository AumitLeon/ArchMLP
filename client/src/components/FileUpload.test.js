import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FileUpload from './FileUpload';
import { createShallow, createMount } from '@material-ui/core/test-utils';

const props = {
  dataName: '',
  setDataName: jest.fn(),
  file: {},
  setFile: jest.fn()
};

describe('FileUpload tests', () => {
  let wrapper;
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  beforeEach(() => {
    wrapper = shallow(<FileUpload {...props} />);
  });

  test('Renders form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  test('Renders dataset name input', () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });

  test('Renders upload button', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  test('Render help text for dataset input field', () => {
    const mount = createMount();
    const helper = mount(<FileUpload {...props} />);

    expect(helper.find(TextField).text()).toEqual(
      'Dataset Name *​File must be CSV format'
    );
  });

  test('Updating dataset name calls setDataName callback', () => {
    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: 'new-name' } });

    expect(props.setDataName).toHaveBeenCalled();
  });

  test('Updating dataset name calls setDataName callback', () => {
    wrapper
      .find('input')
      .simulate('change', { target: { files: ['dummy.value'] } });
    expect(props.setFile).toHaveBeenCalled();
  });
});
