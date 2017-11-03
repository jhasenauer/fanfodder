package com.fanfodder.aggregator.util;

public final class StringUtils {

	private StringUtils() {
		
	}
	
	public static String cleanSmartQuotes(String str) {
		return str != null ? unescapeSql(
				str.replaceAll("\\u0093", "\"").
                replaceAll("\\u0094", "\"").
                replaceAll("\\u0091", "'").
                replaceAll("\\u0092", "'")) : "";
	}

	public static String unescapeSql(String string) {
		return string;
	}

	public static String getNonNullValue(String value) {
		return (value == null) ? "" : value;
	}
}
