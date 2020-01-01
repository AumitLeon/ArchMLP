import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
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

    expect(helper.find(TextField).text()).toEqual('Dataset Name *​');
  });

  test('Clicking github icon opens repo', () => {
    wrapper
      .find(IconButton)
      .at(0)
      .simulate('click');
    expect(global.open).toHaveBeenCalledWith(
      'https://github.com/AumitLeon/archMLP',
      '_blank'
    );
  });

  test('Updating dataset name calls setDataName callback and sets empty helper text', () => {
    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: 'newName' } });
    expect(props.setDataName).toHaveBeenCalled();
    expect(wrapper.find(TextField).props().error).toEqual(false);
    expect(wrapper.find(TextField).props().helperText).toEqual('');
  });

  test('Updating dataset name calls setFile callback', () => {
    wrapper
      .find('input')
      .simulate('change', { target: { files: ['dummy.value'] } });
    expect(props.setFile).toHaveBeenCalled();
  });

  test('Proper helper text on name with length > 31', () => {
    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', {
        target: { value: 'abcdefghijklmnopqrstuvwxyz123456' }
      });
    expect(wrapper.find(TextField).props().helperText).toEqual(
      'Dataset name can only contain 31 characters'
    );
    // Disable button on invalid name input
    expect(wrapper.find(TextField).props().error).toEqual(true);
  });

  test('Proper helper text on name with non-alphanumerics', () => {
    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: 'abcd$' } });
    expect(wrapper.find(TextField).props().helperText).toEqual(
      'Dataset name can only contain alphanumerics'
    );
    // Disable button on invalid name input
    expect(wrapper.find(TextField).props().error).toEqual(true);
  });

  test('Proper helper text on empty input', () => {
    wrapper
      .find(TextField)
      .at(0)
      .simulate('change', { target: { value: '' } });
    expect(wrapper.find(TextField).props().helperText).toEqual('');
    expect(wrapper.find(TextField).props().error).toEqual(false);
  });
});
