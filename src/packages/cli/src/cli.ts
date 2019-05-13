#!/usr/bin/env node
import PrayerTimesNotifier from '../../core/src';
import defaultConfig from './default-config';

new PrayerTimesNotifier( defaultConfig ).start()