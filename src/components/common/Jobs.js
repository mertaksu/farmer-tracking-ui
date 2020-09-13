import React, {Component, Fragment} from 'react';
import {
  Content,
  Icon,
  Text,
  List,
  ListItem,
  Button,
  Right,
  Body,
  Separator,
  Left, Fab,
} from 'native-base';
import {View, StyleSheet} from 'react-native';
import Loader from "./Loader";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.deletePlan = this.deletePlan.bind(this);
  }

  async deletePlan(id) {
    this.props.deletePlan(id);
  }

  render() {
    return (
      <Fragment>
        <Loader
            loading={this.state.loading} />
        <Content
          padder
          style={{backgroundColor: '#455a64'}}>
            <List
              dataArray={this.props.plans}
              renderRow={item => (
                <View style={{backgroundColor: '#455a64'}}>
                  <Separator
                    style={{
                      backgroundColor: '#4c6264',
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <Left>
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        Planlanan İş
                      </Text>
                    </Left>
                    <Right>
                      <Button transparent onPress={() => this.deletePlan(item.farmerPlanId)}>
                        <Text style={{color: '#007aff', fontWeight: 'bold'}}>
                          Sil
                        </Text>
                      </Button>
                    </Right>
                  </Separator>
                  <ListItem
                    noIndent
                    style={{borderWidth: 0, backgroundColor: '#455a64'}}>
                    <Body>
                      <View
                          style={{
                            flex: 1,
                            flexDirection: 'row'
                          }}>
                        <View
                            style={{
                              width: '50%',
                              flexBasis: '50%',
                              flexDirection: 'column'
                            }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.titleText}>Arazi:</Text>
                            <Text style={styles.valueText}>{item.landName}</Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.titleText}>İş:</Text>
                            <Text style={styles.valueText}>{item.planType}</Text>
                          </View>
                        </View>
                        <View
                            style={{
                              width: '50%',
                              flexBasis: '50%',
                              flexDirection: 'column'
                            }}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.titleText}>Ekin:</Text>
                            <Text style={styles.valueText}>{item.cropName}</Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.titleText}>Tarih:</Text>
                            <Text style={styles.valueText}>{item.planDate}</Text>
                          </View>
                        </View>
                      </View>
                    </Body>
                  </ListItem>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          <Text>{"\n\n"}</Text>
          <Fab
              style={styles.button}
              position='bottomRight'
              onPress={() => {
                this.props.navigation.navigate(
                    'Plan', {
                      lands: this.props.lands,
                      products: this.props.products,
                      planAddCallback: this.props.addPlan,
                    }
                );
              }}>
            <Icon name='ios-add' />
          </Fab>
        </Content>

      </Fragment>
    );
  }
}


const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  titleText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  valueText: {
    color: '#fff',
    alignContent: 'flex-start'
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  button: {
    backgroundColor: '#5859f2'
  }
});

export {Jobs};
