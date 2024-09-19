/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: screenWidth} = Dimensions.get('window');
const cardWidth = screenWidth / 3;
const cardsPerSlide = 3;
const slideWidth = cardWidth * cardsPerSlide;

const AccountingDash = ({
  navigation,
  setPage,
  progressData,
  step,
  subCategoryIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [progressData, setProgressData] = useState(null);
  const scrollViewRef = useRef(null);
  const currentCategory = progressData.categories[step];
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / slideWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = index => {
    if (
      index >= 0 &&
      index < Math.ceil(progressData.categories.length / cardsPerSlide)
    ) {
      const toX = index * slideWidth;
      scrollViewRef.current.scrollTo({
        x: toX,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  const summary = progressData?.summary;

  var total_bills_completed = summary.total_bills_completed;
  var total_bills_to_complete = summary.total_bills_to_complete;
  var overall_score = Math.round(
    (total_bills_completed / total_bills_to_complete) * 100,
  );
  const images = {
    'fixed.png': require('../Images/fixed.png'),
    'fixed1.png': require('../Images/fixed1.png'),
    'fixed2.png': require('../Images/fixed2.png'),
  };

  const bgcolor = ['#ADE6D8', '#F6E7C1', '#D7D7D7'];

  const handleSubmit = () => {
    // navigation.navigate('processing');
    setPage(1);
  };
  const renderItem = (item, index) => {
    const backgroundColor = bgcolor[index % bgcolor.length];
    const imageKeys = Object.keys(images);
    const imageKey = imageKeys[index % imageKeys.length];

    const currentCategoryStatus = item.status || 'yet_to_start';
    return (
      <View key={index} style={styles.item}>
        <View style={styles.bostcardbg}>
          <View style={styles.flximgcard}>
            <Image source={images[imageKey]} style={styles.image} />
          </View>
          <View style={styles.backflx}>
            <Text style={styles.Directext}>{item.description}</Text>
          </View>
          <View style={[styles.comcardb, {backgroundColor}]}>
            <View style={styles.tedflx}>
              {currentCategoryStatus === 'completed' && (
                <>
                  <Text style={styles.Completedtext}>Completed</Text>
                  <Text style={styles.Completedtext1}>100%</Text>
                </>
              )}
              {currentCategoryStatus === 'in_progress' && (
                <>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.contitext}>CONTINUE</Text>
                  </TouchableOpacity>
                </>
              )}
              {currentCategoryStatus === 'yet_to_start' && (
                <>
                  <Text style={styles.Completedyet}>Yet to Start</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderSlide = startIndex => (
    <View style={styles.slide} key={startIndex}>
      {progressData.categories &&
        progressData.categories
          .slice(startIndex, startIndex + cardsPerSlide)
          .map((item, index) => renderItem(item, startIndex + index))}
    </View>
  );

  return (
    <View style={styles.accbgcard}>
      <View style={styles.backflx}>
        <View style={styles.Current}>
          <View style={styles.Currentflx}>
            <View style={styles.closeflx}>
              <Text style={styles.Cattext}>Current Category:</Text>
              <Text style={styles.Booktext}>
                {currentCategory && currentCategory.description}
              </Text>
            </View>
            <View style={styles.overflx}>
              <Text style={styles.Comptext}>Overall Completion</Text>
              <Text style={styles.letiontext}>{overall_score}%</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.Recordingtext}>
            Recording of transactions under below category
          </Text>
        </View>
        <View style={styles.andflx}>
          <Animated.View style={styles.scrollViewContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              ref={scrollViewRef}>
              {Array.from(
                {
                  length: Math.ceil(
                    progressData.categories.length / cardsPerSlide,
                  ),
                },
                (_, index) => renderSlide(index * cardsPerSlide),
              )}
            </ScrollView>
          </Animated.View>
          <View style={styles.pagination}>
            {Array.from(
              {
                length: Math.ceil(
                  progressData.categories.length / cardsPerSlide,
                ),
              },
              (_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ),
            )}
          </View>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.leftButton]}
              onPress={() => scrollToIndex(currentIndex - 1)}>
              <Icon name="chevron-back" size={30} color="#fff" />
            </TouchableOpacity>
          )}
          {currentIndex <
            Math.ceil(progressData.categories.length / cardsPerSlide) - 1 && (
            <TouchableOpacity
              style={[styles.navButton, styles.rightButton]}
              onPress={() => scrollToIndex(currentIndex + 1)}>
              <Icon name="chevron-forward" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Completedyet: {
    color: '#636363',
    fontSize: 20,
    fontWeight: '400',
  },
  contitext: {
    backgroundColor: '#D77A00',
    color: '#fff',
    borderRadius: 20,
    fontSize: 20,
    fontWeight: '800',
    paddingVertical: 3,
    paddingHorizontal: 20,
  },
  item: {
    width: cardWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  accbgcard: {
    backgroundColor: '#11294D',
    width: '100%',
    height: '100%',
  },
  backflx: {
    flex: 1,
    alignItems: 'center',
  },
  Current: {
    backgroundColor: '#DEF9FC',
    width: '90%',
    height: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  Currentflx: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  closeflx: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  Cattext: {
    fontWeight: '400',
    fontSize: 18,
    color: '#133D52',
  },
  Booktext: {
    fontWeight: '700',
    fontSize: 18,
    color: '#133D52',
  },
  overflx: {
    backgroundColor: '#77D9FF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 30,
    width: 180,
  },
  Comptext: {
    color: '#000',
  },
  letiontext: {
    color: '#2C87EF',
    fontWeight: '800',
  },
  Recordingtext: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 24,
    paddingVertical: 10,
  },
  andflx: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexDirection: 'row',
  },
  slide: {
    flexDirection: 'row',
  },
  bostcardbg: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 220,
    height: 200,
  },
  flximgcard: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
  },
  Directext: {
    color: '#133D52',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
  comcardb: {
    height: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tedflx: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Completedtext: {
    color: '#138001',
    fontSize: 16,
    fontWeight: '400',
  },
  Completedtext1: {
    color: '#138001',
    fontSize: 20,
    fontWeight: '800',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
  },
  leftButton: {
    left: 10,
  },
  rightButton: {
    right: 10,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AccountingDash;
