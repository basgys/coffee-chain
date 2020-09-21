import { useRef, useEffect } from 'react';
import AbortController from "abort-controller"

import { useAbort } from 'libs/abort';
import uuid from 'uuid';

interface Props {
  parent?: AbortController
  id?: string
}

export const useSignal = (props: Props = {}) => {
  let { parent, id } = props || {};
  const { abortController } = useAbort()
  if (!parent && abortController) {
    parent = abortController
  }
  if (!id) {
    id = uuid.v4()
  }

  const acRef = useRef(new AbortController())
  const ac = acRef.current

  useEffect(() => {
    const log = () => {
      // TODO: Extract logger (only dev)
      // console.log(id, "Abort child")
    }
    ac.signal.addEventListener('abort', log)
    return () => {
      ac.signal.removeEventListener('abort', log)
    }
  }, [parent])

  useEffect(() => {
    const abort = () => {
      // TODO: Extract logger (only dev)
      // console.log(id, "Parent aborted. Aborting child...")
      ac.abort()
    }
    // Abort when parent controller aborts
    if (parent) parent.signal.addEventListener('abort', abort)
    return () => {
      if (parent) parent.signal.removeEventListener('abort', abort)
    }
  }, [parent])

  return ac.signal
}