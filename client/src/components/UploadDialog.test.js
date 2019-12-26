import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { createShallow } from '@material-ui/core/test-utils';
import UploadDialog from './UploadDiaglog';

const props = {
  open: true,
  setOpen: jest.fn(),
  dataName: 'Data set name',
  file: {}
};

describe('FileUpload tests', () => {
  let wrapper;
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
    wrapper = shallow(<UploadDialog {...props} />);
  });
  test('Renders dialog', () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
  test('Renders cancel and upload buttons', () => {
    expect(wrapper.find(Button)).toHaveLength(2);
  });
});
