const baseFont = parseInt(document.documentElement.style.fontSize)

export default {
    window: {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        //screenHeight: Dimensions.get('window').height
    },
    theme: {
        mainColor: '#ff4f4f',
        minorColor: '#333333',
        lineColor: '#eeeeee'
    },
    px2rem(pxv) {
        return `${parseInt(pxv) / 75}rem` 
    },
    rem2px(remv) {
        return `${parseFloat(remv) * 75}px`
    },
    getDpr() {
        let dpr = window.devicePixelRatio;
        const isIPhone = window.navigator.appVersion.match(/iphone/gi);
        if(dpr > 3) dpr = 3;
        if(!isIPhone) dpr = 1;
        return dpr;
    },
    getFontSize(fspx) {
        const dpr = this.getDpr();
        return `${fspx * dpr}px`;
    },
    style: {
        flexbox() {
            return {
                display: 'flex',
                display: '-webkit-flex'
            }
        }   
    },
    icon64: {
        back:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA2ElEQVRYR93XYQrDIAwF4OaGucHak82ewNwwQ1hhDEef5qmw/ipU+j5jiVa2xZcszt/+D6Cqu4h4zvlEqkutgKomEXmUYHc/zCzdIWiAz/DpgEr4aWb73ezL83AFIuFhQDQ8BGCEdwNY4V0AZngzgB3eBBgRDgNGhUOAd29/Xk3F3eEmQ2lEFUAyswN5OTIG6oSVJaAhIECZySgEDBiFaAKMQDQD2IguABPRDWAhQgAGIgyIIiiAH4i5p+JvxPRj+dX3y95R7pF/Amg3RDaUyBjaN9CLWA54AYnZySGc5hn7AAAAAElFTkSuQmCC',
        right:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABPElEQVRYR+3W4W3CQAwFYHuCztANGKHdwJmgMEHbCWCEdILCBHkj0A3KBozQTvDQSYkUohDuYgv+cP8iJXpfbJ/uVO689M758gBkV8DMtqr6RrIG8BnVumxAVVXsQkluAawiENkAM6tV9b2HgIisAPx5INmAFNK1oYf4FZFXD6II0CI2qrqOQhQDWsRSVb8jELMAE4gKwLFkJmYDLiDSQKaZSLORtVyAHqIWkaf0TLII4Qa0iIWq7ucgQgAeRBjgAuII4HlqGKIBZ9tTRA5N0yxuAjCzYfg/yZdrOyKkAiPhhzb86jnhBnjCU2tcAG+4CxARPhtgZmcnYpr23J4Pd0RxC4Z3Ak94cQVGwn9I2k0uJCNXsh2AZdaRN/FSdgsGl9KQ8KIWdINH8gvAh/fPu++zKxAV6N4F0ZBHBU6sr84hNDPE8wAAAABJRU5ErkJggg==',
        backWhite:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA0klEQVRYR93XUQqDMBAE0J2Ttp6setItWyxISeskO2ug+RPEeSYyibDJA5Pz7f8A7n43MwewMbMrnQF3X83stgcvAOL655ABPsIj9DpAI3wDEEtxOtIzkAkPXQqQDU8BFOHDAFX4EEAZ3g1Qh3cBKsJpQFU4Bdi7/XFoFLpkTluI6YEGYAWwMA9n7qGKqLEEMgQFiDepQtCAKkQXoALRDVAjhgBKxDBAhUgBFIg0IIuQAL4grjuUvit36rH8gHidhpl/Amo3ZDaUzD2yb2AUMR3wBNGcgSHOnzBkAAAAAElFTkSuQmCC',
        arrowDown:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA40lEQVRYR+3VYQ3CMBAF4HcOkDAHCwoAB1cFIAUpONhJQMIs4AAUlDRhpAnbej2a7M/1b5e+ry9tR9h40Mb5cIA34A14Az8NMPMVwAFAEJFnq4eKmW8AehHZ52v+AEII9wSIMY4ATi0QKZyIzgAewzB0qwBm3hFRQvQtEFn4K8Z4FJG0se+YPYStEKXwpFi8Bf8iNOGrgDRpRWjDiwALoiZcBahB1IarARqEJbwKsIawhlcDFhAjEV0AzN7z0ktq+hnlt+MTYAo3NTDtKEN0cy9caefTvKkB7eKa7xzgDXgD3sAbFmzGIQusUd8AAAAASUVORK5CYII=',
        arrowUp:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA1UlEQVRYR+3VwQ2DMAwF0O8Nukm7QcsGyaTxBmWEsgkbpHLVSCikgJ1KXJwLB4T+4wsbwsmHTs6HA7wBb8DcQAjhAuAJYAYQmVmu6mMClHAiuklizvkFYLAg1IAqfPq+8tWKUAHq8JzzQwBENAIwIQ4DWuGlcrlnRRwCbIWXr86K2AUcCe9BbAI04VbET4Al3IJoAnrCtYgV4B/hGsQKEGOUmb4DmGTOLdttuY+r6RiZeVjebwFkrcp67Q5vNDGnlD7Lq5zdMVT/XZQPOMAb8Aa8AW/gDQQawyGmIwcTAAAAAElFTkSuQmCC'
    }
}
