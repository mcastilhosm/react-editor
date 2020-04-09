import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TitleIcon from '@material-ui/icons/Title';
import ImageIcon from '@material-ui/icons/Image';
import GetAppIcon from '@material-ui/icons/GetApp';

import { ToolList } from './styles';

export default function ToolDrawer({
  addText,
  deleteElement,
  saveCanvasToPng,
  setOpenModalUrl
}) {
  return (
    <ToolList>
      <Button variant="outlined" onClick={addText} endIcon={<TitleIcon />}>
        Add Text
      </Button>
      <Button
        variant="outlined"
        onClick={deleteElement}
        color="secondary"
        endIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        onClick={saveCanvasToPng}
        color="primary"
        endIcon={<GetAppIcon />}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        onClick={setOpenModalUrl}
        endIcon={<ImageIcon />}
      >
        Load Image(URL)
      </Button>
    </ToolList>
  );
}
