// RCTCalendarModule.m
#import "RCTIMQAModule.h"

@implementation RCTIMQAModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE(ImqaWrappingClass);

RCT_EXPORT_METHOD(setAgentConfig:(NSString *)serverUrl projectKey:(NSString *)projectKey)
{
  NSLog(@"[IMQA] SET AGENT CONFIG : %@ %@", projectKey, serverUrl);
  [NSUserDefaults.standardUserDefaults setObject:serverUrl forKey: @"serverUrl"];
  [NSUserDefaults.standardUserDefaults setObject:projectKey forKey: @"projectKey"];
  [[NSUserDefaults standardUserDefaults] synchronize];
  
  exit(0);
}

@end
