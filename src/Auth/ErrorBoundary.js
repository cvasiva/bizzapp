/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {postErrorToBackend} from './ErrorHandling';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
    this.location = props?.location?.pathname;
    this.subCategoryName = this.location?.split('/')[4];

    if (props.isAPIError) {
      this.componentDidCatch(
        props.apiErrorStackTrace.message,
        props.apiErrorStackTrace.stack ?? props.apiErrorStackTrace.response,
      );
    }
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    const errorPayload = {
      module: this.location?.split('/')[2],
      sub_category: this.location?.split('/')[3],
      category: this.location?.split('/')[4],
      dateTime: new Date().toString(),
      reference_number: new Date().getTime(),
      error: `Message: ${error} , Stack: ${JSON.stringify(errorInfo)}`,
    };

    postErrorToBackend(errorPayload);
  }

  retryHandler = () => {
    // Implement your retry logic here
    // For example, navigate to the previous screen or reload the current screen
    // Assuming you have access to navigation props:
    if (this.props.navigation) {
      this.props.navigation.goBack(); // or navigate to the initial route
    }
  };

  render() {
    if (this.state.hasError || this.props.isAPIError) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://img.freepik.com/free-vector/hand-drawn-404-error_23-2147746234.jpg?w=740&t=st=1655301583~exp=1655302183~hmac=4b65628bf8906d4c431c84b35496a2da540369b3bd89fb55a3de038b52f893bf',
            }}
          />
          <View style={styles.errorContainer}>
            <Text style={styles.title}>
              Something went wrong and our Team has been notified
            </Text>
            <Text style={styles.subtitle}>
              Please quote the below Reference number for more details.
            </Text>
            <Text style={styles.referenceNumber}>
              Reference Number: {new Date().getTime()}
            </Text>
            <Button title="Please reload once" onPress={this.retryHandler} />
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  referenceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
