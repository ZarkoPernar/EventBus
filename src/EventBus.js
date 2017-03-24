
module.exports = class EventBus {
    constructor() {
        this.listeners = {}

        this.addEventListener = this.addEventListener.bind(this)
        this.removeEventListener = this.removeEventListener.bind(this)
        this.hasEventListener = this.hasEventListener.bind(this)
        this.dispatch = this.dispatch.bind(this)

        // added
        this._exists = this._exists.bind(this)
    }

    addEventListener(type, callback, scope, ...args) {
        const payload = {scope, callback, args}

        if (this._exists(type)) {
            this.listeners[type].push(payload)
        } else {
            this.listeners[type] = [payload]
        }
    }

    removeEventListener(type, callback, scope) {
        if (this._exists(type)) {
            const numOfCallbacks = this.listeners[type].length

            // TODO: Check this
            this.listeners[type] = this.listeners[type].filter((listener) => {
                return listener.scope !== scope && listener.callback !== callback
            })
        }
    }

    hasEventListener(type, callback, scope) {
        if (this._exists(type)) {
            return Boolean(this.listeners[type].find((listener) => {
                return (
                    (scope ? listener.scope === scope : true) && 
                    listener.callback === callback
                )
            }))
        }
    }

    dispatch(type, target, ...args) {
        const event = {
            type,
            target
        }

        args = [event, ...args]

        if (this._exists(type)) {
            this.listeners[type].forEach((listener) => {
                let concatArgs = [args, ...listener.args]
                listener.callback.apply(listener.scope, concatArgs)
            })
        }
    }

    _exists(type) {
        return this.listeners[type] !== undefined
    }
}

