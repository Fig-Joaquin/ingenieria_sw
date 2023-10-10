const express = require('express') // importa express
const router = express.Router(); // enrutador

import {createAppealForUser} from "../controllers/appealController.js";

router.post('/nueva-apelacion', createAppealForUser);
