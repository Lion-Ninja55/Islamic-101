import { useEffect } from 'react';
import { useSettings } from '@/context/settings-context';
import { PrayerTimesData } from '@/app/page';
import { LocalNotifications } from '@capacitor/local-notifications';

export function usePrayerNotifications(prayerTimes: PrayerTimesData | null) {
  const { settings } = useSettings();

  // Request permission and initialize on mount
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Request permission
        const permissionStatus = await LocalNotifications.requestPermissions();
        console.log('Notification permission:', permissionStatus);
      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  // Schedule or reschedule notifications when settings or prayer times change
  useEffect(() => {
    if (!prayerTimes || !settings.notifications.enabled) {
      // Cancel all notifications if disabled or no prayer times
      LocalNotifications.cancelAll();
      return;
    }

    const schedulePrayerNotifications = async () => {
      try {
        // Cancel existing notifications
        await LocalNotifications.cancelAll();

        const notifications = [];
        const prayers: { [key: string]: keyof PrayerTimesData } = {
          Fajr: 'Fajr',
          Sunrise: 'Sunrise',
          Dhuhr: 'Dhuhr',
          Asr: 'Asr',
          Sunset: 'Sunset',
          Maghrib: 'Maghrib',
          Isha: 'Isha'
        };

        for (const [displayName, timeKey] of Object.entries(prayers)) {
          if (!settings.notifications[displayName as keyof typeof settings.notifications]) continue;

          const timeStr = prayerTimes[timeKey];
          if (!timeStr) continue;

          // Parse time string (HH:mm format)
          const [hours, minutes] = timeStr.split(':').map(Number);
          const prayerDate = new Date();
          prayerDate.setHours(hours, minutes, 0, 0);

          // Normal reminder at prayer time
          notifications.push({
            id: Date.now() + timeKey.charCodeAt(0), // Unique ID
            title: 'Prayer Time',
            body: `${displayName} time!`,
            schedule: { at: prayerDate.toISOString() },
            channelId: 'prayer_reminders'
          });

          // Early reminder if set
          const beforeAdhan = settings.notifications.beforeAdhan;
          if (beforeAdhan > 0) {
            const earlyDate = new Date(prayerDate.getTime() - beforeAdhan * 60000);
            notifications.push({
              id: Date.now() + timeKey.charCodeAt(0) + 1000, // Different ID
              title: 'Prayer Reminder',
              body: `${displayName} reminder. Minutes left: ${beforeAdhan}`,
              schedule: { at: earlyDate.toISOString() },
              channelId: 'prayer_reminders'
            });
          }
        }

        // Schedule all notifications
        if (notifications.length > 0) {
          await LocalNotifications.schedule({
            notifications
          });
          console.log(`Scheduled ${notifications.length} prayer notifications`);
        }
      } catch (error) {
        console.error('Failed to schedule prayer notifications:', error);
      }
    };

    schedulePrayerNotifications();
  }, [prayerTimes, settings]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      LocalNotifications.cancelAll();
    };
  }, []);
}