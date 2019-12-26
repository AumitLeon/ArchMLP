import React from 'react';
import Button from '@material-ui/core/Button';
import FileUpload from './FileUpload';
import { createShallow } from '@material-ui/core/test-utils';

describe('FileUpload tests', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<FileUpload />);
  });
  test('Renders form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });
  test('Renders dataset name input', () => {
    expect(wrapper.find('input')).toHaveLength(1);
  });
  test('Renders upload button', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
