//
//  ImqaSetting.m
//  rnsoftuikitfree
//
//  Created by IMQA-SUNGYOUN on 2023/05/06.
//


#import <Foundation/Foundation.h>
#import "ImqaSetting.h"

#import <IMQAMPMAgent/IMQAMPMAgent.h>

@implementation ImqaSetting

- (void) IMQASetting{
  
  if (([NSUserDefaults.standardUserDefaults objectForKey:@"serverUrl"] == nil)) {
    [NSUserDefaults.standardUserDefaults setObject:@"https://collector.imqa.io" forKey: @"serverUrl"];
  }
  
  if (([NSUserDefaults.standardUserDefaults objectForKey:@"projectKey"] == nil)) {
    [NSUserDefaults.standardUserDefaults setObject:@"" forKey: @"projectKey"];
  }
  
  NSString* PROJECT_KEY = [NSUserDefaults.standardUserDefaults objectForKey:@"projectKey"];
  NSString* API_URL = [NSUserDefaults.standardUserDefaults objectForKey:@"serverUrl"];
  NSLog(@"[IMQA] setAgentConfig : %@ %@", PROJECT_KEY, API_URL);
  IMQAConfig* mpmConfig = [[IMQAConfig alloc] init:PROJECT_KEY];
  mpmConfig.api_url = API_URL;

  [[IMQAMpm sharedInstance] runWithConfig:mpmConfig];
}



@end
