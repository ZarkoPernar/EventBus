// const babel = require('babel-core')
const expect = require('chai').expect
const EventBus = require('../src/EventBus')

const LISTENER_TYPE = 'x'
const LISTENER_CB = () => {}

let bus

describe('EventBus working with listeners', () => {
    beforeEach(() => {
        bus = new EventBus()
    })

    it('addEventListener works', () => {
        bus.addEventListener(LISTENER_TYPE, LISTENER_CB)

        expect(bus.listeners[LISTENER_TYPE]).to.be.defined
        expect(bus.listeners[LISTENER_TYPE]).not.to.be.empty
    })

    it('removeEventListener works', () => {
        bus.addEventListener(LISTENER_TYPE, LISTENER_CB)
        const prevListeners = bus.listeners

        bus.removeEventListener(LISTENER_TYPE, LISTENER_CB)

        expect(bus.listeners).to.deep.equal({
            [LISTENER_TYPE]: []
        })
    })

    it('hasEventListener works', () => {
        let result

        bus.addEventListener(LISTENER_TYPE, LISTENER_CB)
        
        result = bus.hasEventListener(LISTENER_TYPE, LISTENER_CB)

        expect(result).to.equal(true)
    })

    it('dispatch works', () => {
        let expectedResult = {type: LISTENER_TYPE}
        let actualResult
        
        bus.addEventListener(LISTENER_TYPE, function(event) {
            actualResult = event
        })

        bus.dispatch(LISTENER_TYPE)

        expect(expectedResult).to.equal(expectedResult)
        
    })
})
