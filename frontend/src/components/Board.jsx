import React, { useState, useEffect, useMemo } from 'react'
import { useFetch } from '../services/useFetch';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css'

function Board() {
  return (
    <div style={{width:'100%', height: '700px'}}>
      <Tldraw />
    </div>
  )
}
export default Board;