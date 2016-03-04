export default {
  body: {
    margin: '0px',
    padding: '0px',
    height: '100%',
    fontFamily: "'Roboto', sans-serif",
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  },

  '.tall': {
    height: '100%',
  },

  '.layout.horizontal, .layout.horizontal-reverse, .layout.vertical, .layout.vertical-reverse': {
    display: 'flex',
  },

  '.layout.inline': {
    display: 'inline-flex',
  },

  '.layout.horizontal': {
    'min-width': '0',
    'flex-direction': 'row',
  },

  '.layout.horizontal-reverse': {
    'min-width': '0',
    'flex-direction': 'row-reverse',
  },

  '.layout.vertical': {
    'min-height': '0',
    'flex-direction': 'column',
  },

  '.layout.vertical-reverse': {
    'min-height': '0',
    'flex-direction': 'column-reverse',
  },

  '.layout.wrap': {
    'flex-wrap': 'wrap',
  },

  '.layout.wrap-reverse': {
    'flex-wrap': 'wrap-reverse',
  },

  '.flex-auto': {
    flex: '1 1 auto',
  },

  '.flex-none': {
    flex: 'none',
  },

  '.flex, .flex-1': {
    flex: 1,
  },

  '.flex-2': {
    flex: 2,
  },

  '.flex-3': {
    flex: 3,
  },

  '.flex-4': {
    flex: 4,
  },

  '.flex-5': {
    flex: 5,
  },

  '.flex-6': {
    flex: 6,
  },

  '.flex-7': {
    flex: 7,
  },

  '.flex-8': {
    flex: 8,
  },

  '.flex-9': {
    flex: 9,
  },

  '.flex-10': {
    flex: 10,
  },

  '.flex-11': {
    flex: 11,
  },

  '.flex-12': {
    flex: 12,
  },

  '.layout.start': {
    'align-items': 'flex-start',
  },

  '.layout.center, .layout.center-center': {
    'align-items': 'center',
  },

  '.layout.end': {
    'align-items': 'flex-end',
  },

  '.layout.start-justified': {
    'justify-content': 'flex-start',
  },

  '.layout.center-justified, .layout.center-center': {
    'justify-content': 'center',
  },

  '.layout.end-justified': {
    'justify-content': 'flex-end',
  },

  '.layout.around-justified': {
    'justify-content': 'space-around',
  },

  '.layout.justified': {
    'justify-content': 'space-between',
  },

  '.self-start': {
    'align-self': 'flex-start',
  },

  '.self-center': {
    'align-self': 'center',
  },

  '.self-end': {
    'align-self': 'flex-end',
  },

  '.self-stretch': {
    'align-self': 'stretch',
  },

  '.block': {
    display: 'block',
  },

  '[hidden]': {
    display: 'none !important',
  },

  '.invisible': {
    visibility: 'hidden !important',
  },

  '.relative': {
    position: 'relative',
  },

  '.fit': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  'body.fullbleed': {
    margin: 0,
    height: '100vh',
  },

  '.scroll': {
    overflow: 'auto',
  },

  '.fixed-bottom, .fixed-left, .fixed-right, .fixed-top': {
    position: 'fixed',
  },

  '.fixed-top': {
    top: 0,
    left: 0,
    right: 0,
  },

  '.fixed-right': {
    top: 0,
    right: 0,
    bottom: 0,
  },

  '.fixed-bottom': {
    right: 0,
    bottom: 0,
    left: 0,
  },

  '.fixed-left': {
    top: 0,
    bottom: 0,
    left: 0,
  },
};
