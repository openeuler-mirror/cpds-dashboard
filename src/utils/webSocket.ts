type Param = {
  url: string
  callback: (data: any) => void
  msg?: string
}
class CreateSocket {
  private websocket: WebSocket | undefined
  private lockReconnect = false
  private timeout = 10000
  private timer: number | undefined
  private checkTimer: number | undefined
  private serverCheckTimer: number | undefined
  private isActivelyClose = false
  private param: Param
  constructor(param: Param) {
    this.param = param
  }
  connect() {
    this.isActivelyClose = false
    this.initSocket()
  }
  initSocket() {
    this.websocket = new WebSocket(this.param.url)
    this.websocket.onclose = () => {
      console.log(this.param.url + '--websocket已关闭！')
      // If it is manually shut down, the reconnection is not performed
      if (!this.isActivelyClose) {
        this.reconnectSocket()
      }
    }
    this.websocket.onerror = (e) => {
      console.log(this.param.url + '--websocket发生异常！')
      // If the shutdown is manually performed, no abnormal reconnection is performed
      if (!this.isActivelyClose) {
        this.reconnectSocket()
      }
    }
    this.websocket.onopen = () => {
      console.log(this.param.url + '--websocket已连接！')
      this.heartCheck()
      if (this.param.msg) this.send(this.param.msg)
    }
    this.websocket.onmessage = (e) => {
      this.heartCheck()
      if (e.data.length < 10) return
      this.param.callback(JSON.parse(e.data))
    }
  }
  reconnectSocket() {
    if (this.lockReconnect) return
    console.log(this.param.url + '--websocket正在进行重新连接...')
    this.lockReconnect = true
    this.timer && clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      this.initSocket()
      this.lockReconnect = false
    }, this.timeout)
  }
  send(msg: string) {
    this.websocket && this.websocket.send(JSON.stringify(msg))
  }
  heartCheck() {
    this.checkTimer && clearTimeout(this.checkTimer)
    this.serverCheckTimer && clearTimeout(this.serverCheckTimer)
    this.checkTimer = window.setTimeout(() => {
      this.websocket && this.websocket.send('ping')
      this.serverCheckTimer = window.setTimeout(() => {
        this.websocket && this.websocket.close()
      }, this.timeout)
    }, this.timeout)
  }
  // Manually close websocket
  close() {
    this.isActivelyClose = true
    this.websocket && this.websocket.close()
  }
}

export default CreateSocket
