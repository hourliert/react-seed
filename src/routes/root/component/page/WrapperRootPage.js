import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Helmet from 'react-helmet';

import pureRender from 'pure-render-decorator';
import LeftMenuDrawer from 'components/LeftMenuDrawer';
import ErrorManager from 'components/ErrorManager';
import { WindowResizeListener } from 'react-window-resize-listener';

import favicon from 'images/favicon/favicon.ico';
import logo192 from 'images/logo/logo-192x192.png';

import styles from './styles';

@pureRender
export default class WrapperRootPage extends Component {
  static propTypes = {
    children: PropTypes.node,

    version: PropTypes.string,
    menus: PropTypes.array,
    errors: PropTypes.object,
    leftNavOpen: PropTypes.bool,
    appBarDepth: PropTypes.number,

    markErrorsAsViewed: PropTypes.func,
    clearErrors: PropTypes.func,
    closeLeftNav: PropTypes.func.isRequired,
    toggleLeftNav: PropTypes.func.isRequired,
    goToLink: PropTypes.func.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  static defaultProps = {
    version: '',
  };

  state = {
    screenWidth: 'md',
    isSignin: this.context.router.isActive('/signin'),
  }

  getScreenCategory() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      this.setState({ screenWidth: 'xs' });
    } else if ((screenWidth >= 768) && (screenWidth < 992)) {
      this.setState({ screenWidth: 'sm' });
    } else if ((screenWidth >= 992) && (screenWidth < 1200)) {
      this.setState({ screenWidth: 'md' });
    } else if (screenWidth >= 1200) {
      this.setState({ screenWidth: 'lg' });
    }
  }

  render() {
    const {
      children,
      errors,
      markErrorsAsViewed,
      clearErrors,
      leftNavOpen,
      closeLeftNav,
      toggleLeftNav,
      goToLink,
      menus,
      appBarDepth,
    } = this.props;

    const {
      screenWidth,
      isSignin,
    } = this.state;

    const isMobile = ((screenWidth === 'sm') || (screenWidth === 'xs'));

    const { muiTheme: { rawTheme: { palette } } } = this.context;

    return (
      <div className="flex layout vertical">
        <Helmet
          title="RetaxSeed"
          meta={[
            { name: 'description', content: 'RetaxSeed Web Application' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'application-name', content: 'RetaxSeed' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
            { name: 'apple-mobile-web-app-title', content: 'RetaxSeed' },

            { name: 'theme-color', content: palette.primary1Color },
            { name: 'msapplication-TileColor', content: palette.primary1Color },
          ]}
          link={[
            { rel: 'icon', sizes: '192x192', href: logo192 },
            { rel: 'apple-touch-icon', href: logo192 },
            { rel: 'shortcut icon', href: favicon },
          ]}
        />
        <AppBar
          title={`RetaxSeed - ${this.props.version}`}
          onLeftIconButtonTouchTap={toggleLeftNav}
          zDepth={appBarDepth}
        />
        <LeftMenuDrawer
          open={((leftNavOpen) || (!isMobile)) && !isSignin}
          onClose={closeLeftNav}
          onLinkTouch={goToLink}
          menuItems={menus}
          isMobile={isMobile}
        />

        <ErrorManager
          errors={errors}
          markErrorsAsViewed={markErrorsAsViewed}
          clearErrors={clearErrors}
        />

      <div
        className="flex layout vertical"
        style={(isMobile || isSignin) ? styles.mobileContainer : styles.desktopContainer}
      >
          {children}
        </div>
        <WindowResizeListener onResize={::this.getScreenCategory} />
      </div>
    );
  }
}
