import express, { json, urlencoded } from 'express'
import multer from 'multer'
import { loadImage } from 'canvas'
import * as canvas from 'canvas'
import * as path from 'path'
import * as faceapi from 'face-api.js'
import { readJSON } from './util.js'

const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

const data = readJSON('./data.json')
const app = express()
const port = 1234

app.use(json())
app.use(urlencoded({ extended: true }))

// Configuración de multer para gestionar la carga de archivos

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'carpeta-imagenes'))
  },
  filename: (req, file, cb) => {
    cb(null, 'imagen.jpg') // Nombre del archivo en el servidor
  }
})

const upload = multer({ storage })
// Cargar modelos necesarios de face-api.js
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromDisk('./models'),
  faceapi.nets.faceLandmark68Net.loadFromDisk('./models'),
  faceapi.nets.faceRecognitionNet.loadFromDisk('./models')
]).then(startServer)

function startServer () {
  // Ruta para manejar la carga de imágenes
  app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      console.log(req.body.password)

      const imgRef = await loadImage('./imagen.jpg')
      const ref = await faceapi
        .detectSingleFace(imgRef)
        .withFaceLandmarks()
        .withFaceDescriptor()

      const img = await loadImage('./carpeta-imagenes/imagen.jpg')
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor()

      if (detection.descriptor) {
        const labeledDescriptors = [
          new faceapi.LabeledFaceDescriptors(
            req.body.password,
            [ref.descriptor]
          )
        ]

        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)

        const bestMatch = faceMatcher.findBestMatch(detection.descriptor)
        console.log('encontrado')
        console.log(bestMatch.toString())

        const dataUser = {
          nameUser: req.body.password
        }
        data.push(dataUser)
        res.status(200).json({ success: true, message: 'Rostro detectado', value: bestMatch.toString() })
      } else {
        res.status(400).json({ success: false, message: 'No se detectaron rostros' })
      }
    } catch (error) {
      console.error('Error al procesar la imagen:', error)
      res.status(500).json({ success: false, message: 'Error interno del servidor' })
    }
  })

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
  })
}
