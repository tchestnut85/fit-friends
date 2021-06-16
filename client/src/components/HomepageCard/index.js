import { Card, Icon, List } from 'semantic-ui-react';

import React from 'react';

export const HomepageCard = ({ user, header }) => {
    return (
        <>
            <Card className='grid-card'>
                <Card.Header textAlign='center'>
                    <Icon name='group' /> {header}
                </Card.Header>
                <Card.Content>
                    {user.teamMemberOf.length > 0
                        ? user.teamMemberOf.map((team) => (
                              <List divided relaxed>
                                  <List.Item>
                                      <List.Icon
                                          name='group'
                                          size='large'
                                          verticalAlign='middle'
                                      />
                                      <List.Content>
                                          <List.Header>{team}</List.Header>
                                      </List.Content>
                                  </List.Item>
                              </List>
                          ))
                        : `${user.name}, you don't belong to any teams yet. You can start a team or join a friend's team!`}
                </Card.Content>
                <Card.Content extra>
                    Total Teams: {user.teamMemberOf.length}
                </Card.Content>
            </Card>
        </>
    );
};
