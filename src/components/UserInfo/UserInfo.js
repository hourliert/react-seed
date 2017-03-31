import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';

// custom components
import PasswordReset from 'components/PasswordReset';
import PersonalInfo from 'components/PersonalInfo';

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
        <PersonalInfo />
        <PasswordReset
          regexRules={regexRules}
        />
      </div>
    );
  }
}
