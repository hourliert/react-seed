import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';

// custom components
import FormPasswordReset from 'components/FormPasswordReset';
import FormPersonalInfo from 'components/FormPersonalInfo';

@pureRender
export default class UserInfo extends Component {
  static propTypes = {

  };

  render() {
    const regexRules = [
      {
        regex: '(?=.{8,})',
        description: 'At least 8 characters',
      },
      {
        regex: '(?=.*[0-9])',
        description: 'At least 1 numerical character',
      },
      {
        regex: '(?=.*[a-z])|(?=.*[A-Z])',
        description: 'At least 1 alphabetical character',
      },
    ];

    return (
      <div>
        <FormPersonalInfo />
        <FormPasswordReset
          regexRules={regexRules}
        />
      </div>
    );
  }
}
