import React, { useState, useEffect, useRef, useMemo } from 'react';
import { fabric } from 'fabric';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

import { Container, Body, ContentDrawer, Drawer } from './styles';

import Header from '../../components/Header';
import ToolDrawer from '../../components/ToolDrawer';

export default function Index() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [openModalUrl, setOpenModalUrl] = useState(false);
  const [url, setUrl] = useState('');
  const dimensionsCanvas = useMemo(() => {
    return {
      w: window.innerWidth - 40,
      h: window.innerHeight - 160
    };
  }, []);
  const [clearCanvas, setClearCanvas] = useState(false);

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
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: 18
    });

    canvas.add(iText).setActiveObject(iText);
  }

  function handleDeleteElement() {
    canvas.getActiveObjects().forEach(obj => canvas.remove(obj));
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
    if (!url) return;

    fabric.Image.fromURL(
      url,
      img => {
        if (img._element) {
          if (clearCanvas) canvas.remove(...canvas.getObjects());

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

          setClearCanvas(false);
          setOpenModalUrl(false);
          setUrl('');
        } else {
          setOpenError(true);
          setMessageError('Não foi possível carregar a imagem');
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
        <ToolDrawer
          addText={handleAddText}
          deleteElement={handleDeleteElement}
          saveCanvasToPng={handleSaveCanvasToPng}
          setOpenModalUrl={() => setOpenModalUrl(true)}
        />
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
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={clearCanvas}
                onChange={() => setClearCanvas(!clearCanvas)}
                name="checkedB"
                color="primary"
              />
            }
            label="Limpar canvas"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setClearCanvas(false);
              setOpenModalUrl(false);
              setUrl('');
            }}
            color="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={() => handleLoadImgFromUrl(url)} color="primary">
            Carregar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        onClose={() => {
          setOpenError(false);
          setMessageError('');
        }}
        message={messageError}
      />
    </Container>
  );
}
