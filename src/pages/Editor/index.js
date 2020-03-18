import React, { useState, useEffect, useRef, useMemo } from 'react';
import { fabric } from 'fabric';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TitleIcon from '@material-ui/icons/Title';
import ImageIcon from '@material-ui/icons/Image';
import GetAppIcon from '@material-ui/icons/GetApp';

import { Container, Body, ToolList, ContentDrawer, Drawer } from './styles';

import Header from '../../components/Header';

function Editor() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [errorOpenUrlFromImg, setErrorOpenUrlFromImg] = useState(false);
  const [openModalUrl, setOpenModalUrl] = React.useState(false);
  const [url, setUrl] = useState('');
  const dimensionsCanvas = useMemo(() => {
    return {
      w: window.innerWidth - 40,
      h: window.innerHeight - 160
    };
  }, []);

  useEffect(() => {
    if (!canvas) {
      fabric.Object.prototype.transparentCorners = true;
      fabric.Object.prototype.objectCaching = false;
      fabric.Object.prototype.cornerSize = 10;
      fabric.Object.prototype.padding = 5;
      fabric.Object.prototype.rotatingPointOffset = 20;

      setCanvas(new fabric.Canvas(canvasRef.current));
    } else {
      canvas.setHeight(dimensionsCanvas.h);
      canvas.setWidth(dimensionsCanvas.w);
    }
  }, [canvas, dimensionsCanvas.h, dimensionsCanvas.w]);

  function handleAddText() {
    const iText = new fabric.IText('Novo Texto', {
      left: between(1, canvas.getWidth() / 2),
      top: between(1, canvas.getHeight() / 2),
      fontFamily: 'Helvetica',
      fontWeight: 400,
      fontSize: 18
    });
    canvas.add(iText).setActiveObject(iText);
  }

  function handleDeleteElement() {
    canvas.getActiveObjects().forEach(obj => {
      canvas.remove(obj);
    });
  }

  function handleSaveCanvasToPng() {
    const linkSource = canvas.toDataURL({
      format: 'png',
      multiplier: 2
    });

    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = 'image.png';
    downloadLink.click();
    downloadLink.remove();
  }

  function handleLoadImgFromUrl(url) {
    fabric.Image.fromURL(
      url,
      img => {
        if (img._element) {
          if (img.width <= dimensionsCanvas.w) {
            canvas.setHeight(img.height);
            canvas.setWidth(img.width);
            canvas.setBackgroundImage(img);
          } else {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              scaleX: dimensionsCanvas.w / img.width,
              scaleY: dimensionsCanvas.h / img.height
            });
          }

          setOpenModalUrl(false);
        } else {
          setErrorOpenUrlFromImg(true);
        }
      },
      { crossOrigin: 'anonymous' }
    );
  }

  function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <Container>
      <Header />

      <Body>
        <ToolList>
          <Button
            variant="outlined"
            onClick={handleAddText}
            endIcon={<TitleIcon />}
          >
            Add Text
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeleteElement}
            color="secondary"
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleSaveCanvasToPng}
            color="primary"
            endIcon={<GetAppIcon />}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenModalUrl(true)}
            endIcon={<ImageIcon />}
          >
            Load Image(URL)
          </Button>
        </ToolList>
        <ContentDrawer>
          <Drawer ref={canvasRef} />
        </ContentDrawer>
      </Body>

      <Dialog open={openModalUrl} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Carregar URL de imagem</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="URL da Imagem"
            type="text"
            fullWidth
            onChange={e => setUrl(e.target.value)}
          />
          <Snackbar
            open={errorOpenUrlFromImg}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            onClose={() => setErrorOpenUrlFromImg(false)}
            message="Não foi possível carregar a imagem"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModalUrl(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={() => handleLoadImgFromUrl(url)} color="primary">
            Carregar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Editor;
